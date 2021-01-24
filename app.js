const comments = document.querySelector(".comments")
const nameRegisterContainer = document.querySelector(".name")
const commentSection = document.querySelector(".comment-section")
const textbox = document.getElementById("textbox")
const submitBtn = document.getElementById("submit")
const logoutBtn = document.getElementById("logout")
const nameRegisterBtn = document.getElementById("nameRegister")
const nameTextbox = document.getElementById("name")
let commentsArr = []
let tempArr = []
let username
var global

window.addEventListener("load",e=>{
    
    firstScreen()
    
    if(localStorage.getItem("comments"))
    {
        // commentsArr = JSON.parse(localStorage.getItem("comments"))
        tempArr = JSON.parse(localStorage.getItem("comments"))
        let x = tempArr
        // console.log(x[0].replies,"Length:"+x[0].replies.length);
        // console.log(x[0]);
        // alert(x[0].replies.length)
        // commentsArr=temp
        // //console.log(commentsArr);
        renderComments(true,tempArr)
    }
})
function firstScreen()
{
    username=localStorage.getItem("username")
    if(username)
    {
        // console.log("name Hai");
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



nameRegisterBtn.addEventListener("click",e=>{
    if(nameTextbox.value)
    {
        username=nameTextbox.value
        localStorage.setItem("username",nameTextbox.value)
        firstScreen()
    }
})

logoutBtn.addEventListener("click",(e)=>{
    localStorage.removeItem("username")
    document.querySelector(".comment-section").classList.toggle("visible")
    
    

    console.log(localStorage.removeItem("username"));
    username=null
    firstScreen()
})

submitBtn.addEventListener("click",e=>{
    e.preventDefault()

    console.clear()
    addComment(true,textbox.value,username)
    localStorage.setItem("comments",JSON.stringify(commentsArr))
    
})

function renderComments(x,comments,p)
{
    
    // console.log(comments[0].replies);
    comments.forEach((cmt,i)=>{
        let rand = Math.floor(Math.random()*30)
        // console.log(cmt.text+rand+" index: "+i);
        // setTimeout(()=>{
            addComment(x,cmt.text,cmt.name,cmt.likes,cmt.parent,cmt.id,cmt.replies,p)
            console.log(i);
            if(cmt.replies.length > 0)
            {
                // console.log(cmt);
                renderComments(false,comments[i].replies,cmt)
                
            }
            console.log(cmt.text+" over");
        // },1000)
        
    })
}

function addComment(doPush,textboxText,name,likes,parent,id,replies,p)
{
    // console.log(replies);
    let obj=commentObj(id,name,replies,textboxText,likes,parent)
    // console.log(obj.replies.length);
    global=obj
    const container = document.createElement("div")
    const nameTag = document.createElement("p")
    const likesContainer = document.createElement("span")
    const repliesContainer = document.createElement("span")
    // const expandComments = document.createElement("i")
    
    // expandComments.classList.add("fas")
    // expandComments.classList.add("fa-angle-down")

    container.setAttribute("id",obj.id)
    
    nameTag.innerHTML=name
    nameTag.classList.add("username")
    const commentText = document.createElement("p")
    commentText.classList.add("comment-text")
    commentText.innerHTML = textboxText
    
    // const likesIcon = document.createElement("i")
    // likesIcon.innerHTML = likes?likes:0
    // likesIcon.classList.add("fas")
    // likesIcon.classList.add("fa-heart")
    // likesIcon.classList.add("like-icon")
    // likesContainer.append(likesIcon)

    const repliesIcon = document.createElement("i")
    repliesIcon.classList.add("far")
    repliesIcon.classList.add("fa-comment")
    repliesIcon.classList.add("reply-icon")
    repliesContainer.append(repliesIcon)
    
    container.classList.add("comment")
    
    
    // likesIcon.addEventListener("click",(e)=>{
        
    //     if(likesIcon.classList.contains("like-icon-liked"))
    //         obj.likes-=1
    //     else
    //         obj.likes+=1
        
    //     likesIcon.innerHTML=obj.likes
    //     console.log(this);
    //     // console.log(parentObj.likes);
    //     console.log(commentsArr);
    //     localStorage.setItem("comments",JSON.stringify(commentsArr))
    //     console.log(localStorage.getItem("comments"));
    //     likesIcon.classList.toggle("like-icon-liked")
    // })

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
            console.log(obj);
            addComment(true,tb.value,username,0,obj)
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
    
    container.append(nameTag,commentText)
    
    // if(doPush)
    // {
        
        if(parent)
        {
            
            // console.log("has parent");
            if(doPush)
            {
                if(p)
                    p.replies.push(obj)
                else
                    parent.replies.push(obj)

            }
            
            // console.log(obj.replies.length);
            container.style.marginLeft="30px"
            // console.log(parent);
            if(p)
                document.getElementById(p.id).append(container)
            else
                document.getElementById(parent.id).append(container)
        }
        else
        {
            if(doPush)
                commentsArr.push(obj)
            comments.append(container)
        }
        container.append(repliesContainer)
        textbox.value=""
}

function commentObj(id,name,rep,comment,liked,parent)
{
    return{
        id:id ? id : Date.now(),
        name: name ? name : username,
        parent:parent ? parent.id : null,
        text:comment,
        replies:rep ? rep : [],
        likes:liked ? liked : 0
    }
}
