import React from 'react'

const Text = ({ variant, children, weight, className = '', style = {}, ...props }) => {
    const Tag = variant || 'p';
    const fontWeight = (weight) => {
        const heavy = { thin: 'font-thin', extralight: 'font-extralight', light: 'font-light', regular: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold', extrabold: 'font-extrabold', black: 'font-black' };

        return heavy[weight] || heavy.regular;
    };

    const defaultClasses = (Tag) => {
        const classes = {
            p: 'font-base tracking-normal leading-relaxed text-sm md:text-base xl:text-lg xl:leading-loose',
            h6: 'font-brand capitalize tracking-normal leading-normal text-base md:text-lg xl:text-xl',
            h5: 'font-brand capitalize tracking-normal leading-normal text-lg md:text-xl xl:text-2xl',
            h4: 'font-brand capitalize tracking-normal leading-normal text-xl md:text-2xl xl:text-3xl',
            h3: 'font-brand capitalize tracking-tight leading-normal md:leading-snug text-2xl md:text-3xl xl:text-4xl',
            h2: 'font-brand capitalize tracking-tight leading-snug md:leading-tight text-3xl md:text-4xl xl:text-5xl',
            h1: 'font-brand capitalize tracking-tight leading-snug md:leadingtight text-4xl md:text-5xl xl:text-6xl',
        };

        return classes[Tag] || classes.p;
    };

    return <Tag className={`${defaultClasses(Tag)} ${fontWeight(weight)} ${className}`} style={style} {...props}>{children}</Tag>;
};

export default Text;
