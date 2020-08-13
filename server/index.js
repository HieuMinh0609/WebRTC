const io = require('socket.io')(3000);

const userInfor= []

io.on('connection',socket =>{
    //console.log(socket.id);
    socket.on('NGUOI_DUNG_DANG_KY',user =>{
        const isExist = userInfor.some(e => e.ten === user.ten);
        socket.peerId = user.peerId;
        if(isExist){
            return socket.emit('DANG_KY_THAT_BAI');
        }
        userInfor.push(user);
         
        socket.emit('DANH_SACH_ONLINE',userInfor);
        
        socket.broadcast.emit('CO_NGUOI_MOI',user);

       
    });

    socket.on('disconnect',()=>{
        const index= userInfor.findIndex(user => user.peerId === socket.peerId);
        console.log("index:"+index)
        console.log("id:"+socket.peerId)
        console.log(userInfor[index])
        console.log(userInfor)
        userInfor.splice(index,1);
        io.emit('AI_DO_NGAT_KET_NOI',socket.peerId);
    });
});

