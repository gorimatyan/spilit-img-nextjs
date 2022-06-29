import { NextPage } from "next";
import { ChangeEvent, createContext, MouseEvent, useEffect, useRef, useState } from 'react';
import styles from '../styles/ImgCanvas.module.css'



const CropImg: NextPage  = () => {
    const canvasRef = useRef(null); // useRefは基本的にDOMの参照をするために使用する

    const setImg = async () => {
        let img = new Image();
        img.src = 'demoImages/Management1.png';
        const canvas: any = canvasRef.current;
        const ctx: CanvasRenderingContext2D = await canvas.getContext('2d')

        img.onload = () => {  // 画像が読み込まれたときに行う処理を書く。画像の読み込みが完了する前に drawImage() を呼び出しても、何も行いません
            ctx.drawImage(img, 0, 0);
        };
    }
    const loadImg = () => {
        let img = new Image();
        img.src = 'demoImages/Management1.png';
        return img;
    }
    const loadCtx = () => {
        const canvas: any = canvasRef.current;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
        return ctx;
    }

    useEffect(() => {
        setImg();
    },[])

// ----------------------------------------------------------------------------------------------------------------------
    const [clickX, setClickX] = useState<number>(0);
    const [clickY, setClickY] = useState<number>(0);
    const onDragStart = (e: MouseEvent) => {
        const img = loadImg();
        const ctx = loadCtx();
        ctx.clearRect( 0, 0, 200, 200 );
        // ctx.drawImage(img, clickX-75, clickY-75);
        console.log('DragStart');
    }
    const onMouseMove = (e: MouseEvent) => { // 常にクリック開始位置を取得できる
        const canvas: any = canvasRef.current;
        setClickX(e.pageX - canvas.offsetLeft);
        setClickY(e.pageY - canvas.offsetTop);
    }
    const onDrag = (e: MouseEvent) => {
        console.log('mouseDrag');
        // 画像をドラッグする度に画像を更新する
        const img = loadImg();
        const ctx = loadCtx();
        // 背景を塗りつぶし、画像の位置を更新する
        
        ctx.clearRect( 0, 0, 200, 200 );
        const canvas: any = canvasRef.current;
        setClickX(e.pageX - canvas.offsetLeft);
        setClickY(e.pageY - canvas.offsetTop);
        let x:number = clickX;
        let y:number = clickY;
        ctx.drawImage(img, x-(img.width/2)*sliderValue*0.01, y-(img.height/2)*sliderValue*0.01,img.width*sliderValue*0.01,img.height*sliderValue*0.01);
        console.log((img.width/2)*sliderValue*0.01)
        // console.log(x,y);
    }

    const onDragEnd = (e: MouseEvent) => {
        // let x:number = e.offsetX;
        // let y:number = e.offsetY;
        // console.log('mouseDragEnd');
        // console.log(x,y);
    }
    const [sliderValue, setSliderValue] = useState<any>(100);
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
                    onDragStart={(e) => onDragStart(e)}
                    onMouseMove={(e) => onMouseMove(e)}
                    onDrag={(e) => onDrag(e)}
                    onDragEnd={(e) => onDragEnd(e)}
                />
            </div>
            <input type="range" min="1" max="200" step="1" value={sliderValue} onChange={(e) => changeSliderValue(e)} />
        </>
    );
}

export default CropImg;

