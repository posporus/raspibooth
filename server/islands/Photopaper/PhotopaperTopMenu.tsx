import Icon from '../../components/Icon.tsx'

export type DownloadOptionsType = 'archive' | 'snapshot' | 'gif'

const AddFavourite = () => (
    <li>
        <a>
            <Icon iconName="star" prefix="fas" />
        </a>
    </li>
)

const TreePointMenu = () => (
    <li class="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0}>
            <Icon iconName="ellipsis" prefix="fas" />
        </label>
        <ul tabIndex={0} class="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
            <li>
                <a onClick={() => console.log('not yet implemented')}><Icon iconName="file-zipper" prefix="fas" />Download Raw</a>
            </li>

            <li>
                <a onClick={() => console.log('not yet implemented')}><Icon iconName="trash-can" prefix="fas" />Delete from Server</a>
            </li>
        </ul>
    </li>
)

const Help = () => (
    <li>
        <a>
            <Icon iconName="question" prefix="fas" />
        </a>
    </li>
)

export const PhotopaperTopMenu = () => {
    return (
        <div class="grid grid-flow-col place-content-between w-full">
            <ul class="menu menu-horizontal menu-md rounded-box">
                <AddFavourite />
            </ul>
            <ul class="menu menu-horizontal menu-md bg-base-200 rounded-full">
                <Help />
                <TreePointMenu />
            </ul>
        </div>
    )
}
