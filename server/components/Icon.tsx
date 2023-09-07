import { library, icon, type IconName, type Icon, type IconPrefix } from '../deps.ts'
/* solid icons */
import {
    faPlay,
    faBars,
    faDownload,
    faCaretUp,
    faCaretDown,
    faQuestion,
    faCircleInfo,
    faFileZipper,
    faImage,
    faImages,
    faSliders,
    faPersonBooth,
    faLocation,
    faCalendarCheck,
    faEnvelope,
    faAt,
    faCamera,
    faGauge,
    faFilm,
    faShareNodes,

} from 'https://esm.sh/*@fortawesome/free-solid-svg-icons'
library.add({
    faPlay,
    faBars,
    faDownload,
    faCaretUp,
    faCaretDown,
    faQuestion,
    faCircleInfo,
    faFileZipper,
    faImage,
    faImages,
    faSliders,
    faPersonBooth,
    faLocation,
    faCalendarCheck,
    faEnvelope,
    faAt,
    faCamera,
    faGauge,
    faFilm,
    faShareNodes,

})

/* brand icons */
import { faGithub } from 'https://esm.sh/*@fortawesome/free-brands-svg-icons'
library.add({
    faGithub,
})

type IconProps = {
    iconName: IconName
    prefix: IconPrefix
}

interface SVGProps {
    data: Icon
}

export default function Icon (props: IconProps) {
    const svgData = icon(props)
    if(!svgData) return null
    //console.log('svgData',svgData)
    return (
        <SVG data={svgData} />
    )
}


function SVG ({ data }: SVGProps) {
    const { type, prefix, iconName, icon } = data

    if (!type || type !== 'icon' || !icon) {
        return null
    }

    const [width, height, , , pathData] = icon

    return (
        <svg
            className="w-[1em] h-[1em]"
            aria-hidden="true"
            data-prefix={prefix}
            data-icon={iconName}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${width} ${height}`}
        >
            <path fill="currentColor" d={typeof pathData === "string" ? pathData : pathData.join(',')}></path>
        </svg>
    )
}