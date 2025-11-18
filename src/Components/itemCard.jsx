import m from 'mithril'
import numeral from 'numeral'
import localNumeral from './../helpers/localNumeral.js'
import { css } from '../../styled-system/css'

numeral.register('locale', 'es-cl', localNumeral )
numeral.locale('es-cl')

export default function(){
    return {
        view:(vnode)=>{
            const {imagen,nombre,descripcion,colorText,precio,precio_unitario} = vnode.attrs
           return (
            <div class={css({
              bg: 'white',
              rounded: 'xl',
              shadow: 'md',
              transition: 'shadow',
              overflow: 'hidden',
              fontFamily: 'poppins',
              fontWeight: 'semibold',
              _hover: {
                shadow: 'xl'
              }
            })}>
                <div class={css({
                  h: '56',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                })}>
                    <img src={imagen} class={css({
                      maxW: 'full',
                      maxH: 'full',
                      objectFit: 'contain'
                    })}/>
                </div>
                <div class={css({ p: '6' })}>
                    <h4 class={css({
                      fontSize: '2xl',
                      fontWeight: 'bold',
                      color: 'gray.800',
                      mb: '3',
                      lineHeight: 'tight'
                    })}>{nombre}</h4>
                    <p class={css({
                      fontSize: 'lg',
                      color: 'gray.600',
                      mb: '5',
                      lineHeight: 'relaxed'
                    })}>{descripcion}</p>
                    <p class={css({
                      textAlign: 'center',
                      borderTopWidth: '2px',
                      borderTopStyle: 'solid',
                      pt: '5',
                      mt: '5',
                      color: colorText
                    })}>
                        <span class={css({
                          fontSize: '5xl',
                          fontWeight: 'bold'
                        })}>{numeral(precio).format('$0,0')}</span>
                        {precio_unitario && <p class={css({
                          textAlign: 'center',
                          fontSize: '2xl',
                          color: colorText,
                          mt: '2',
                          fontFamily: 'poppins',
                          fontWeight: 'bold'
                        })}><span class={css({
                          fontSize:'xl'
                        })}>$&nbsp;&nbsp;</span>{numeral(precio_unitario).format('0,0')}&nbsp;<span class={css({fontStyle:'italic',fontSize:'xl'})}>c/u</span></p>}
                    </p>
                </div>
            </div>
            )
        }
    }
}

