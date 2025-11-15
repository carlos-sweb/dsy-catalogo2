import m from 'mithril'
import { css } from '../../styled-system/css'

function footer(){
  return {
    view:(vnode)=>(
        <footer class={css({
          mt: '5',
          bg: 'gray.800',
          color: 'white',
          py: '10',
          fontFamily: 'poppins',
          fontWeight: 'regular'
        })}>
          <div class={css({
            maxW: '7xl',
            mx: 'auto',
            px: '4',
            textAlign: 'center'
          })}>
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
              <a class={css({
                color: 'blue.400',
                textDecoration: 'underline',
                fontSize: 'md',
                transition: 'colors',
                _hover: {
                  color: 'blue.300'
                }
              })} href={vnode.attrs.link.url}>
                  {vnode.attrs.link.text}
              </a>
          </div>
        </footer>
    )
  }
}

export default footer