const comments = document.querySelector(".comments")
const nameRegisterContainer = document.querySelector(".name")
const commentSection = document.querySelector(".comment-section")
const textbox = document.getElementById("textbox")
const submitBtn = document.getElementById("submit")
const logoutBtn = document.getElementById("logout")
const nameRegisterBtn = document.getElementById("nameRegister")
const nameTextbox = document.getElementById("name")
let commentsArr = []
let temp = []
let username
// var global

window.addEventListener("load",e=>{
    
    firstScreen()
    

})
function firstScreen()
{
    username=localStorage.getItem("username")
    if(username)
    {
        console.log("name Hai");
        nameRegisterContainer.classList.add("invisible")
        nameRegisterContainer.classList.remove("visible")

        commentSection.classList.add("visible")
        commentSection.classList.remove("invisible")

    }
    else
    {
        console.log("name nahi Hai");

        nameRegisterContainer.classList.add("visible")
        nameRegisterContainer.classList.remove("invisible")
        commentSection.classList.add("invisible")
        commentSection.classList.remove("visible")
    }
}

if(localStorage.getItem("comments"))
{
    // commentsArr = JSON.parse(localStorage.getItem("comments"))
    commentsArr = JSON.parse(localStorage.getItem("comments"))
    // commentsArr=temp
    // //console.log(commentsArr);
    renderComments(commentsArr)
}

nameRegisterBtn.addEventListener("click",e=>{
    if(nameTextbox.value)
    {
        username=nameTextbox.value
        // commentSection.classList.toggle("visible")
        // nameRegisterContainer.removeChild(nameRegisterBtn)
        // nameRegisterContainer.removeChild(nameTextbox)
        localStorage.setItem("username",nameTextbox.value)
        firstScreen()
    }
})

logoutBtn.addEventListener("click",(e)=>{
    localStorage.removeItem("username")
    document.querySelector(".comment-section").classList.toggle("visible")
    
    // nameRegisterContainer.appendChild(nameTextbox)
    // nameRegisterContainer.appendChild(nameRegisterBtn)

    console.log(localStorage.removeItem("username"));
    username=null
    firstScreen()
})

submitBtn.addEventListener("click",e=>{
    e.preventDefault()

    console.clear()
    addComment(true,textbox.value,username)
    localStorage.setItem("comments",JSON.stringify(commentsArr))
    //console.log(JSON.parse(localStorage.getItem("comments")))
})

function renderComments(comments)
{
    comments.forEach(cmt=>{

        //console.log(cmt);
        addComment(false,cmt.text,cmt.name,cmt.likes,cmt.parent,cmt.id,cmt.replies)
        if(cmt.replies.length > 0)
            renderComments(cmt.replies)
        })
    return
}


function addComment(doPush,textboxText,name,likes,parent,id,replies)
{
    // console.log(name);
    let obj=commentObj(id,name,replies,textboxText,likes,parent)
    // global=obj
    const container = document.createElement("div")
    const nameTag = document.createElement("p")
    const likesContainer = document.createElement("span")
    const repliesContainer = document.createElement("span")
    const repliesContainer = document.createElement("span")
    
    container.setAttribute("id",obj.id)
    
    nameTag.innerHTML=name
    nameTag.classList.add("username")
    const commentText = document.createElement("p")
    commentText.classList.add("comment-text")
    commentText.innerHTML = textboxText
    
    const likesIcon = document.createElement("i")
    likesIcon.innerHTML = likes?likes:0
    likesIcon.classList.add("fas")
    likesIcon.classList.add("fa-heart")
    likesIcon.classList.add("like-icon")
    // likesIcon.style.display="inline-block"
    likesContainer.append(likesIcon)

    const repliesIcon = document.createElement("i")
    repliesIcon.classList.add("far")
    repliesIcon.classList.add("fa-comment")
    repliesIcon.classList.add("reply-icon")
    repliesContainer.append(repliesIcon)
    
    // reply.innerHTML = "Reply"
    container.classList.add("comment")
    
    // container.style.border = " 1px solid black"
    // container.style.padding = "20px"
    
    likesIcon.addEventListener("click",(e)=>{
        //console.log("hi");
        let parentObj = findParent(commentsArr)
        function findParent(arr)
        {
            let value
            for(let i=0;i<arr.length;i++)
            {
                //console.log("matching:")
                //console.log(arr[i].id, parent);
                if(arr[i].id==obj.id)
                    return arr[i]
                if(arr[i].replies.length>0)
                    value=findParent(arr[i].replies)
                    if(value)
                        return value
            }
        }
        console.log(parentObj);
        if(likesIcon.classList.contains("like-icon-liked"))
            parentObj.likes-=1
        else
            parentObj.likes+=1
        
        likesIcon.innerHTML=parentObj.likes
        console.log(this);
        console.log(parentObj.likes);
        console.log(commentsArr);
        localStorage.setItem("comments",JSON.stringify(commentsArr))
        console.log(localStorage.getItem("comments"));
        likesIcon.classList.toggle("like-icon-liked")
    })

    repliesIcon.addEventListener("click",e=>{
        
        const tb = document.createElement("input")
        const submit = document.createElement("i")
        const cancel = document.createElement("i")
        // cancel.innerHTML="&times"
        cancel.classList.add("far")
        cancel.classList.add("fa-times-circle")
        cancel.classList.add("fa-1x")
        cancel.classList.add("cancel-icon")

        submit.classList.add("far")
        submit.classList.add("fa-paper-plane")
        submit.classList.add("send-icon")
        tb.setAttribute("type","text")
        // submit.innerHTML="Reply"
        container.insertBefore(tb, container.children[3]);
        container.insertBefore(submit, container.children[4]);
        container.insertBefore(cancel, container.children[5]);
        repliesIcon.style.display="none"

        submit.addEventListener("click",e=>{
            addComment(true,tb.value,username,0,obj.id)
            localStorage.setItem("comments",JSON.stringify(commentsArr))
            repliesIcon.style.display="inline-block"
            container.removeChild(tb)
            container.removeChild(submit)
            container.removeChild(cancel)
        })
        cancel.addEventListener("click",e=>{
            // addComment(true,tb.value,obj.id)
            // localStorage.setItem("comments",JSON.stringify(commentsArr))
            repliesIcon.style.display="inline-block"
            container.removeChild(tb)
            container.removeChild(submit)
            container.removeChild(cancel)

        })
    })
    
    container.append(nameTag,commentText,likesContainer)
    
    // if(doPush)
    // {
        if(parent)
        {
            //console.log("pushing inside",parent);

            // let parentObj = commentsArr.filter(cmt=>cmt.id==parent)[0]
            let parentObj = findParent(commentsArr)
            //console.log("found?:",parentObj);
            function findParent(arr)
            {
                let value
                for(let i=0;i<arr.length;i++)
                {
                    //console.log("matching:")
                    //console.log(arr[i].id, parent);
                    if(arr[i].id==parent)
                        return arr[i]
                    if(arr[i].replies.length>0)
                        value=findParent(arr[i].replies)
                        if(value)
                            return value
                }
            }
            if(doPush)
            parentObj.replies.push(obj)
            container.style.marginLeft="30px"
            document.getElementById(parentObj.id).append(container)

            //console.log("pushed:",obj);

            // parent.replies.push(obj)
            // container.style.marginLeft="30px"
            // document.getElementById(parent.id).append(container)
        }
        else
        {
            //console.log(textboxText,"in else");
            if(doPush)
                commentsArr.push(obj)
            comments.append(container)
        }
        // }
        
        // localStorage.getItem("comments")?localStorage.setItem("comments",JSON.stringify([...JSON.parse(localStorage.getItem("comments")),obj])) : localStorage.setItem("comments",JSON.stringify([obj]))
        container.append(repliesContainer)
        //console.log(commentsArr);
        
        
        textbox.value=""
}

function commentObj(id,name,rep,comment,liked,parent)
{
    // if(parent)
    console.log("liked?",liked);

    return{
        id:id ? id : Date.now(),
        name: name ? name : username,
        parent:parent ? parent : null,
        text:comment,
        replies:rep ? rep : [],
        likes:liked ? liked : 0
    }
}
let xObj={
    id:Date.now()+"",
    text:"hi",
    replies:[{
        id:Date.now()+"",
        text:"hi",
        replies:undefined  
    }]
}

let x=[
    xObj
]