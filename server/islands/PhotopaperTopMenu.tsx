import Icon from '../components/Icon.tsx'

export type DownloadOptionsType = 'archive' | 'snapshot' | 'gif'

export const PhotopaperTopMenu = () => {
    return (
        <div class="flex flex-row flex-even">
            <ul class="menu menu-horizontal menu-lg bg-base-200 rounded-box text-2xl">
                <Icon iconName="question" prefix="fas" />
            </ul>

            <ul class="menu menu-horizontal menu-lg bg-base-200 rounded-box text-2xl">
            <Icon iconName="question" prefix="fas" />
            </ul>
        </div>
    )
}
