const express = require('express')
const cors = require('cors')
const app = express();
var fs = require('fs');
const write_border = require('./info/write_border')
const show_list = require('./info/show_list')
const show_text = require('./info/show_text')
const count_views = require('./info/count_views')
const Signup = require('./info/signup')
const userlogin = require('./info/userlogin')
const delet_page = require('./info/delet_page')
const coment = require('./info/coment')
const path = require('path');
const bodyParser = require('body-parser')
const db = require('./database/db');
const multer = require('multer')
const options = {
    origin: "*", // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};
// app.use('/',  express.static(path.join(__dirname, 'uploads')));
app.use(cors(options));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))



// app.use('/',write_border)
// app.use('/show_list',show_list)
// app.use('/',show_text)
// app.use('/',count_views)
// app.use('/',Signup)
// app.use('/',userlogin)
// app.use('/',delet_page)
// app.use('/',coment)


app.get('/page_number',(req, res)=>{
    console.log('/show_list_page 호출됨')
    const sql2 = `select count(*) from motogall_write;`
    db.query(sql2, (err, rs)=>{
        res.send(rs)
        console.log(rs)
    })
})
app.get('/show_list',(req, res)=>{
    console.log('/show_list 호출됨')
    const page = req.query.page
    const num = page * 10
    console.log('페이지넘버',num)
    const sql = `select * from motogall_write order by id desc limit ${num},10;`
    db.query(sql, (err, rs)=>{
        res.send(rs)
    })
})
app.post('/coment',(req, res, next)=>{
    console.log('/coment 호출됨')
    const id = req.body.indexs
    const nickname = req.body.nickname
    const coment = req.body.coment

    const sql = `insert into motogall_coment (indexs, nickname, coment, times) value( '${id}', '${nickname}', '${coment}', now() );`
    console.log(sql)

    db.query(sql, (err, rs)=>{
        res.send(rs)
    })
})
app.post('/coment_show',(req, res)=>{
    console.log('/coment_show 호출됨')
    const id = req.body.indexs

    const sql = `select * from motogall_coment where indexs = ${id} and textnum = 0;`
    db.query(sql, (err, rs)=>{
        res.send(rs)
    })
})
app.post('/reply_show',(req, res)=>{
    console.log('/reply_show 호출됨')
    const indexs = req.body.indexs
    const nickname = req.body.nickname
    const reply = req.body.reply
    const f_id = req.body.f_id
    const s_id = req.body.s_id
    const f_s_id =req.body.f_s_id
    const s_indexs = req.body.s_indexs
    console.log(f_id)
    console.log(s_id)
    console.log(f_s_id)
    console.log(indexs)
    console.log(s_indexs)
    // console.log(sql)
    // console.log(sql2)
    console.log(req.body)
    const sql =`insert into motogall_coment (indexs,nickname,coment,textnum,textnum2,times) value(${indexs},'${nickname}','${reply}', ${f_id},${f_id}, now() );`
    const sql2 = `insert into motogall_coment (indexs,nickname,coment,textnum,textnum2,times) value(${s_indexs},'${nickname}','${reply}', ${f_s_id},${s_id}, now() );`
    if(s_id===undefined){
        console.log('1번작동')
        db.query(sql, (err, rs)=>{
            res.send(rs)
        })
    }else{
        console.log('2번작동')
        db.query(sql2, (err, rs)=>{
            res.send(rs)
        })
    }
})
app.post('/reply_shows',(req,res)=>{
    console.log('대댓글 불러오는중')
    const indexs = req.body.indexs
    const f_id= req.body.f_id
    const s_id= req.body.s_id
    console.log(req.body)
    
    const sql = `select * from motogall_coment where indexs = ${indexs} and textnum = ${f_id}`
    const sql2 = `select * from motogall_coment where indexs = ${indexs} and textnum = ${f_id} and textnum = ${s_id};`
    if(s_id===undefined){
        db.query(sql, (err, rs)=>{
            res.send(rs)
        })
    }else{
        db.query(sql2, (err, rs)=>{
            res.send(rs)
        })
    }

})
app.post('/count_views',(req, res, next)=>{
    console.log('/count_views 호출됨')
    const ids = req.body.ids
    const vcount = req.body.vcount
    const sql = `update motogall_write set views = ${vcount}+1 where id = ${ids};`


    db.query(sql, (err, rs)=>{
        res.send(rs)
    })
})
app.post('/delet_page',(req, res, next)=>{
    console.log('/delet_page 호출됨')
    const id = req.body.indexs
    console.log(id)
    const sql = `delete from motogall_write where id = ${id}`


    db.query(sql, (err, rs)=>{
        res.send(err)
    })
})
app.post('/show_text',(req, res, next)=>{
    
    console.log('/show_text 호출됨')
    const id = req.body.indexs
    console.log(id)
    const sql = `select * from motogall_write where id=${id}`
    db.query(sql, (err, rs)=>{
        res.send(rs)
    })
})

app.post('/show_img',(req, res, next)=>{
    console.log('/show_img 호출됨')
    const idpk = req.body.idpk
    // console.log(idpk)
    const sql = `select path1 from boder_img where idpk='${idpk}';`
    db.query(sql, (err, rs)=>{
        // console.log(rs[0])
        res.send(rs[0])
    })
})
// app.use('/img',(req, res)=>{
//     fs.readFile('./uploads/1657780424335.JPG', (err, data)=>{
//         res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
//         res.end(data);
//     })
// })
app.get('/show_img2',(req, res, next)=>{
    console.log('/show_img2')
    const path1 = req.query.path
    fs.readFile(`./uploads/${path1}`, (err, data)=>{
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        res.end(data);
    })
})

app.post('/signup',(req, res)=>{
    console.log('/signup 호출됨')
    const userid = req.body.user_id
    const userpass = req.body.user_pass
    const useremail = req.body.user_email

    const sql = `insert into motogall_userinform (userid, userpass, useremail) values('${userid}', '${userpass}', '${useremail}')`
    db.query(sql, (err,rs)=>{
        console.log(rs)
    })

})

app.post('/userlogin',(req, res)=>{
    console.log('/userlogin 호출됨')
    const userid = req.body.userid
    const userpass = req.body.userpass
    const sql = `select * from motogall_userinform where userid = '${userid}' and userpass = '${userpass}';`
    db.query(sql, (err, rs)=>{
        if(rs.length < 1){
            res.send(false)
        }else{
            res.send(rs[0])
        }
        
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.split(".");
      ext = ext[ext.length - 1];
      cb(null, `${Date.now()}.${ext}`);
    }
  });
  const upload = multer({ storage: storage });
  
  
  
  
  const {v4} = require('uuid')
  const uuid = () => {
    const tokens = v4().split('-')
    return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
  }
  uuid();
  
  
  const makeidx =()=>{
    return idx = uuid()
  }
  app.use('/uuid',(req,res,next)=>{
    makeidx()
    console.log(idx)
  })
  
  app.post('/uploadimg', upload.single('upload'), (req,res)=>{
    const path1 = req.file.filename
    const sql = `insert into boder_img (idpk,path1) values('${idx}','${path1}')`
    db.query(sql, (err, rs)=>{
      console.log(sql)
    })
  })
  
  app.post('/write_border', (req, res)=>{
    const title = req.body.title
    const content = req.body.content
    const nickname = req.body.nickname
    const sql = `insert into motogall_write ( title, content, nickname, idpk) values( '${title}', '${content}', '${nickname}', '${idx}')`
    db.query(sql, (err, rs)=>{
        console.log(sql)
    })
  
  })
  
  








app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, '/client/build','index.html'))
})



app.listen(process.env.PORT || 4000,()=>{
    console.log(process.env.PORT || 4000 + '번 포트 실행중')
})