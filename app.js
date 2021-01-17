const comments = document.querySelector(".comments")
const textbox = document.getElementById("textbox")
const submitBtn = document.getElementById("submit")

let commentsArr = []
if(localStorage.getItem("comments"))
{
    commentsArr = JSON.parse(localStorage.getItem("comments"))
    // console.log(commentsArr);
    renderComments(commentsArr)
}

submitBtn.addEventListener("click",e=>{
    e.preventDefault()

    console.clear()
    addComment(true,textbox.value)
    localStorage.setItem("comments",JSON.stringify(commentsArr))
    console.log(JSON.parse(localStorage.getItem("comments")))
})

function renderComments(comments)
{
    comments.forEach(cmt=>{

        console.log(cmt);
        addComment(false,cmt.text,cmt.parent,cmt.id,cmt.replies)
        if(cmt.replies.length>0)
            renderComments(cmt.replies)
        })
    return
}

// function render(cmt)
// {
//     addComment(cmt.text,cmt.parent,cmt.id,cmt.replies)
//     if(cmt.replies)
//         renderComments(cmt)

// }

function addComment(doPush,textboxText,parent,id,replies)
{
    console.log("from addComment",parent);
    let obj=commentObj(id,replies,textboxText,parent)

    const container = document.createElement("div")
    container.setAttribute("id",obj.id)
    const commentText = document.createElement("p")
    const reply = document.createElement("button")
    
    commentText.innerHTML = textboxText
    reply.innerHTML = "Reply"
    container.style.border=" 1px solid black"
    
    reply.addEventListener("click",e=>{
        
        const tb = document.createElement("input")
        const submit = document.createElement("button")
        tb.setAttribute("type","text")
        submit.innerHTML="Reply"
        container.append(tb,submit)
        reply.style.display="none"

        submit.addEventListener("click",e=>{
            addComment(true,tb.value,obj.id)
            localStorage.setItem("comments",JSON.stringify(commentsArr))
            reply.style.display="block"
            container.removeChild(tb)
            container.removeChild(submit)
        })  
    })
    
    container.append(commentText,reply)
    
    // if(doPush)
    // {
        if(parent)
        {
            console.log("pushing inside",parent);

            // let parentObj = commentsArr.filter(cmt=>cmt.id==parent)[0]
            let parentObj = findParent(commentsArr)
            console.log("found?:",parentObj);
            function findParent(arr)
            {
                let value
                for(let i=0;i<arr.length;i++)
                {
                    console.log("matching:")
                    console.log(arr[i].id, parent);
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

            console.log("pushed:",obj);

            // parent.replies.push(obj)
            // container.style.marginLeft="30px"
            // document.getElementById(parent.id).append(container)
        }
        else
        {
            console.log(textboxText,"in else");
            if(doPush)
                commentsArr.push(obj)
            comments.append(container)
        }
        // }
        
        // localStorage.getItem("comments")?localStorage.setItem("comments",JSON.stringify([...JSON.parse(localStorage.getItem("comments")),obj])) : localStorage.setItem("comments",JSON.stringify([obj]))
        
        console.log(commentsArr);
        
        
        textbox.value=""
}

function commentObj(id,rep,comment,parent)
{
    if(parent)
    console.log("returing obj:",parent.id);
    return{
        id:id ? id : Date.now(),
        parent:parent ? parent : null,
        text:comment,
        replies:rep ? rep : []
    }
}
let x=[{
    id:Date.now()+"",
    text:"hi",
    replies:[{
        id:Date.now()+"",
        text:"hi",
        replies:undefined  
    }]
}]