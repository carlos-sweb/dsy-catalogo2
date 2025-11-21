import m from 'mithril'
import { css } from '../../styled-system/css'

import filterForSearch from './../helpers/filterForSearch.js'
import InputSearch from './inputSearch.jsx'
import ItemCard from './itemCard.jsx'


var valueSearch = ''
var handleChildInputChange = (vl) =>  valueSearch = vl

const content = function(){
    return {
        view:( vnode )=>{
            window.scrollTo({top:0,behavior:'smooth'})
            const dataFilter = filterForSearch(vnode.attrs['categorias'],valueSearch)
            return (
            <main class={css({
                maxW: '7xl',
                mx: 'auto',
                px: '4',
                pb: '12'
            })}>
                <InputSearch
                    value={valueSearch}
                    onValueChange={handleChildInputChange} />
                    {dataFilter.map( category =>(
                        <section class={css({ mb: '20' })}>
                            {/* Cabecera del titulo */}
                            <div class={css({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4',
                                h: '12',
                                mb: '8'
                            })}>
                                <div class={css({
                                    w: '2',
                                    h: '12',
                                    rounded: 'full',
                                    bg: category.colors.primary ,
                                })}></div>
                                <h2 class={css({
                                    fontSize: '4xl',
                                    fontWeight: 'bold',
                                    color: 'gray.800',
                                    fontFamily: 'poppins'
                                })}>{category.name}</h2>
                            </div>
                            {/* Subtitulo y Contenido */}
                            <div class={css({ mb: '12' })}>
                            {/* subtitulo de categoria */}
                            { category['subcategorias'].map( sub => (
                                [<div class={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3',
                                    mb: '6'
                                })}>
                                    <div class={css({
                                        w: '1.5',
                                        h: '8',
                                        rounded: 'full',
                                        bg:category.colors.primary
                                    }) }></div>
                                    <h3 class={css({
                                        fontSize: '2xl',
                                        fontWeight: 'bold',
                                        color: 'gray.700',
                                        fontFamily: 'poppins'
                                    })}>{sub.name}</h3>
                                </div>,
                                <div class={css({
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                                    gap: '8',
                                    mb: '6'
                                })}>
                                    { sub['productos'].map( producto => (
                                        <ItemCard
                                            descripcion={producto.descripcion}
                                            colorText={category.colors["text-primary"]}
                                            imagen={producto.imagen}
                                            precio={producto.precio}
                                            precio_unitario={producto.precio_unitario}
                                            nombre={producto.nombre}
                                                />
                                        ) ) }
                                </div>]
                            ) ) }
                            </div>
                        </section>
                    ))}

            </main>
            )
        }
    }
}


export { content as default }