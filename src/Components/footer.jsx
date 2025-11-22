import m from 'mithril'
import { css } from '../../styled-system/css'

export default {
    view:(vnode)=>(
        <footer class='footer'>
          <div>
              <p class={css({
                color: 'gray.400',
                fontSize: 'lg',
                mb: '3'
              })}>{vnode.attrs.copyright}</p>
              <p class={css({
                color: 'gray.500',
                fontSize: 'md',
                mb: '4'
              })}>{vnode.attrs.aviso}</p>
              <a href={vnode.attrs.link.url}>{vnode.attrs.link.text}</a>
          </div>
        </footer>
    )
  }