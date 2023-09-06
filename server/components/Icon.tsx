import { type IconName, type Icon, type IconPrefix } from 'npm:@fortawesome/fontawesome-svg-core'
import { icon } from '../icons.ts'
type IconProps = {
    iconName: IconName
    prefix: IconPrefix
}

interface SVGProps {
    data: Icon
}

export default function Icon (props: IconProps) {
    const svgData = icon(props)
    return (
        <SVG data={svgData} />
    )
}


function SVG ({ data }: SVGProps) {
    const { type, prefix, iconName, icon } = data

    if (type !== 'icon' || !icon) {
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