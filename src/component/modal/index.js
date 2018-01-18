import $ from '../../utils/jquery.js';
import './index.less'
import Button from "../../container/button";

const Modal = args => {
    let {
        title,
        content,
        callback
    } = args;
    if(title==undefined){
        title="{title: 请输入title参数}"
    }
    if(content==undefined){
        content="{content: 请输入content参数}"
    }
    if(callback==undefined){
        callback=()=>{}
    }
    let mask = document.createElement('div');
    mask.className = 'component-mask';
    mask.innerHTML = `
        <div class="component-model">
            <div class="component-model-header">
                <span class="title">${title}</span>
                ${Button({
                    className:"confirm btn-close",
                    text:"X"
                }).outerHTML}
            </div>
            <div class="component-model-body">
                    ${content}
            </div>
            <div class="component-model-footer">
                ${Button({
                    className:"return",
                    text:"返回"
                }).outerHTML}
                &nbsp;
                &nbsp;
                ${Button({
                    className:"confirm btn-primary",
                    text:"确认"
                }).outerHTML}
            </div>
        </div>
    `;
    mask.addEventListener('click',e=>{
        e.stopPropagation()
        // e.preventDefault()
        // return false
        if(
            e.path[0].classList.contains('component-mask')
        ){
            mask.remove()
            $('body').style.overflow = "auto";
        }
	},false)
	let btns = mask.querySelectorAll('.component-model button');
    btns.forEach(dom=>{
        dom.addEventListener('click',()=>{
            mask.remove()
            $('body').style.overflow = "auto";
            if(dom.classList.contains('confirm')) {
                callback();
            }
        })
    })
    $('body').style.overflow = "hidden";
    $('body').append(mask);
}

// let removeAnimation = e =>{
//     const {
//         dom,
//         styles
//     } = e
//     for(let style in styles){
//         console.log(
//             style,": ",styles[style]
//         );
//         dom.style[style] = styles[style]
//     }
// }

export default Modal;