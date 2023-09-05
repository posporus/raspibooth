import { library, icon } from 'npm:@fortawesome/fontawesome-svg-core'
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
} from 'npm:@fortawesome/free-solid-svg-icons'
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
})

/* brand icons */
import { faGithub } from 'npm:@fortawesome/free-brands-svg-icons'
library.add({
    faGithub,
})

export { library, icon }
