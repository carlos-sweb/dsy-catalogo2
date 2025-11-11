import m from 'mithril'
function footer(){
  return {
    view:(vnode)=>(
        <footer class="footer poppins-regular">
          <div class="footer-box">
              <p class="copyright">{vnode.attrs.copyright}</p>
              <p class="notice">{vnode.attrs.aviso}</p>
              <a class="link" href={vnode.attrs.link.url}>
                  {vnode.attrs.link.text}
              </a>
          </div>
        </footer>
    )
  }
}

export default footer