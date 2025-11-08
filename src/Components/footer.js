import m from 'mithril'
const footer ={
    view:function(vnode){
        const url = vnode.attrs.link.url,
        url_text = vnode.attrs.link.text;
        return m("footer.footer.poppins-regular",
            m("div.footer-box",
                [
                    m("p.copyright",vnode.attrs.copyright),
                    m("p.notice",vnode.attrs.aviso),
                    m("a.link",{href:url},url_text)
                ]
                )
            )
    }
}
export { footer as default } 