interface AnimatedBackgroundProps {
    speed: number
}

export default function AnimatedBackground () {
    const rotateKeyframes = `
        @keyframes rotate {
            0% {
            transform: rotate(0deg);
            }
            100% {
            transform: rotate(360deg);
            }
        }
        `

    const outTopStyle = {
        animation: 'rotate 20s linear infinite',
        transformOrigin: '13px 25px',
        fill: '#9b5de5',
        //stroke: 'black'
    }

    const inTopStyle = {
        animation: 'rotate 10s linear infinite',
        transformOrigin: '13px 25px',
        fill: '#f15bb5',
        //stroke: 'black'
    }

    const outBottomStyle = {
        animation: 'rotate 25s linear infinite',
        transformOrigin: '84px 93px',
        fill: '#00bbf9',
        //stroke: 'black'
    }

    const inBottomStyle = {
        animation: 'rotate 15s linear infinite',
        transformOrigin: '84px 93px',
        fill: '#00f5d4',
        //stroke: 'black'
    }
    
    return (
        <>
            <svg class="fixed top-0 left-0 h-full w-full opacity-40 blur-xl -z-50" preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
                <defs>
                    <style>{rotateKeyframes}</style>
                </defs>
                <path fill="#9b5de5" style={outTopStyle} d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z" />
                <path fill="#f15bb5" style={inTopStyle} d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z" />
                <path fill="#00bbf9" style={outBottomStyle} d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z" />
                <path fill="#00f5d4" style={inBottomStyle} d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z" />
            </svg>
        </>
    )
}