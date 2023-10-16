const models = require("../models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "novelcutleewonno";
const { Sequelize, Op } = require('sequelize');

const createJwtToken = (userid, nick, write_name) => {
    try {
        const token = jwt.sign({ userid, nick, write_name }, secretKey, {
            algorithm: "HS256", 
        })
        return token;
    } catch (error) {
        console.log(error)
        return { error }
    }
}

const verifyJwtToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return { error };
    }
}

//암호화
const bcryptPassword = (password) => {
    return bcrypt.hash(password, 10);
};
const comparePassword = (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword);
};

exports.postLogin = async (req, res) =>{
    console.log(req.body.userid);
    try{
        const user = await models.User.findOne({
            where: { userid: req.body.userid },
        });
        
        if (!user) {
            res.json({ result: false, message: '아이디 혹은 비밀번호가 틀렸습니다.' });
            return;
        }
        
        const profile = await models.Profile.findOne({
            where: { userid: req.body.userid },
        });
          
        const ans = await comparePassword(req.body.pw, user.pw);
        if (ans) {
            const token = createJwtToken(user.userid, profile.dataValues.nick, profile.dataValues.write_name);
            res.json({ result: true, token });
        } else {
            res.json({ result: false, message: '아이디 혹은 비밀번호가 틀렸습니다.' });
        } 
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

exports.postSignup = async (req, res)=>{
    try {
        const { userid, pw, name, nick, write_name } = req.body;
     
        const user = await models.User.create({
            userid, pw: await bcryptPassword(pw), profile: {
                name, nick, write_name
            }
        }, { include: models.Profile });

        res.send({ result: true });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

exports.postLoginCheck = async (req, res)=>{
    try{
        const result = verifyJwtToken(req.body.token);
        if(result.userid.length > 0){
            res.json({result:true, id:result.userid, nick:result.nick, write_name:result.write_name});
            return;
        }
    }
    catch (error) {
        console.log(error)
        res.json({ message: 'Internal Server Error', result:false });
    }
}

exports.postImage = (req, res)=>{
    res.send(req.file);
}

exports.postCreate = async (req, res)=>{
    try{
        const novel = await models.Novel.create({
            write_name:req.body.write_name,
            name:req.body.title,
            summary:req.body.summary,
            cover_img:req.body.cover_img,
            genre:req.body.genre,
        });

        if(novel){
            res.json({result:true});
        }
    }
    catch(err){
        console.log(err);
    }
}

exports.getList = async (req, res)=>{
    const list = await models.Novel.findAll({ where:{
        write_name: req.query.write_name
    }});
    res.json({result:true, list});
}

exports.postRound = async (req, res)=>{

    const {title, content, writer_comment, round, novel_id} = req.body;
    try{
        const round_res = await models.Round.create({
            title,
            content,
            writer_comment,
            round,
            novel_id,
        });

        const novel_update = await models.Novel.update({
            round,
        },
        {
            where: { id: novel_id },
        })

        if(round_res){
            res.json({result:true});
        }
    }
    catch(err){
        console.log(err);
    }
}

exports.getNovel = async (req, res)=>{
    try{
        const {id} = req.query;
        const info = await models.Novel.findAll({ where:{id} });
        const list = await models.Round.findAll({where:{novel_id: id}});

        res.json({result:true, info, list});
    }
    catch(err){
        res.json({result:false});
    }
}

exports.getRound = async (req, res)=>{
    const {id, round} = req.query;
    const list = await models.Round.findOne({where:{novel_id: id, round}});
    console.log(list);
    res.json({result:true, list});
}

exports.getMainRecent = async (req, res)=>{
    const list = await models.Novel.findOne({where:{round: { [Op.gt]: 0 },}, order: [["createDate", "desc"]]});
    console.log(list);
    res.json({result:true, list});
}

exports.getSearch = async (req, res)=>{
    const {query} = req.query;
    const novelList = await models.Novel.findAll({where:{round: { [Op.gt]: 0 }, [Op.or]: [{ name: { [Op.like]: `%${query}%` } }]}});
    const writerList = await models.Novel.findAll({where:{round: { [Op.gt]: 0 }, [Op.or]: [{ write_name: { [Op.like]: `%${query}%` } }]}});

    res.json({novelList, writerList});
}

exports.getSort = async (req, res)=>{
    const novelList = await models.Novel.findAll({
        where: { round: { [Op.gt]: 0 } },
        order: [['like', 'DESC']],
        limit: 10
      });
      const roundList = await models.Round.findAll({
        order: [['createDate', 'DESC']],
        limit: 10
      });

    console.log(novelList);
    console.log(roundList);

    res.json({result:true, novelList, roundList});
}