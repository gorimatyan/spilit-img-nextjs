import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import styles from '../styles/ImgCanvas.module.css'



const ImgCanvas: NextPage = () => {
    // useEffect(() => {
    //     const canvas = document.getElementById('canvas');
    //     const Canvas = document.createElement("canvas");
    //     if(canvas){
    //         const can = canvas.getContext("2d");

    //     }
    //     console.log(Canvas);
        

    // }, [])

    // return (
    //     <div>
    //         <canvas id='canvas' className={styles.canvas} width="200" height="200" ></canvas>
    //     </div>
    // );
    const canvasRef = useRef(null);

    const getContext = (): CanvasRenderingContext2D => {
      const canvas: any = canvasRef.current;
        console.log(canvasRef);
        
      return canvas.getContext('2d');
    };
  
    useEffect(() => {
      const ctx: CanvasRenderingContext2D = getContext();
      console.log(ctx);
      const img = new Image();
      img.src = 'demoImages/Management1.png';
      
    //   ctx.fillRect(0,0, 200, 200);
    //   ctx.save();
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    })
  
    return (
      <div>
        <canvas className={styles.canvas} ref={canvasRef} width="200" height="200" />
      </div>
    );
}

export default ImgCanvas;