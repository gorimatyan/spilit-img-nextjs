import { NextPage } from 'next';
import { ChangeEvent, createContext, MouseEvent, useEffect, useRef, useState } from 'react';
import styles from '../styles/ImgCanvas.module.css'



const ImgCanvas: NextPage = () => {
    const canvasRef = useRef(null);

    // canvasRefのDOMを取得する
    const getContext = (): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;
        // console.log(canvasRef);

        return canvas.getContext('2d');
    };

    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        //   console.log(ctx);
        let img = new Image();
        img.src = 'demoImages/Management1.png';

        img.onload = () => {  // 画像が読み込まれたときに行う処理を書く。画像の読み込みが完了する前に drawImage() を呼び出しても、何も行いません
            ctx.drawImage(img, 0, 0);
        };
    },[])
    

    const [mouseX, setMouseX] = useState<number>(0)
    const [mouseY, setMouseY] = useState<number>(0)
    const onDrag = (e: MouseEvent) => {
        canvasRef.current;
        let img = new Image();
        img.src = 'demoImages/Management1.png';
        
        // console.log(canvasRef.current);
        const ctx: CanvasRenderingContext2D = getContext();
        console.log(e.clientX)
        ctx.fillStyle = 'rgb(200,200,200)';
        setMouseX(e.clientX);
        setMouseY(e.clientY);
        ctx.fillRect(0,0,200,200) // (x,y) = (0,0)の位置からwidth:200px,height:200pxの四角形を生成
        ctx.drawImage(img,0,0,img.width,img.height, mouseX, mouseY,img.width,img.height);
        
        // console.log(ctx);
        // console.log(ctx.getImageData);
        // console.log(mouseX);
    }
    const onMouseUp = (e: MouseEvent) => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
    }
    const [sliderValue, setSliderValue] = useState<any>(10);
    const changeSliderValue = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(sliderValue);
        return setSliderValue(e.target.value);
        
    }

    return (
        <>
            <div>
                <canvas
                    className={styles.canvas}
                    ref={canvasRef}
                    width="200"
                    height="200"
                    draggable
                    onDrag={(e) => onDrag(e)}
                    onMouseUp={(e) => onMouseUp(e)}
                />
            </div>
            <input type="range" min="0" max="100" step="1" value={sliderValue} onChange={(e) => changeSliderValue(e)}/>
        </>
    );
}

export default ImgCanvas;


