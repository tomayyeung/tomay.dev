"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./Carousel.module.css"
import Image from "next/image";


/**
 * To fit an image:
 * The maximum width & height are defined, eg 550px x 300px for focused image
 * If the image's dimensions are smaller than both max dimensions, place it as is
 * If either dimension is larger, scale the image down to fit in both dimensions
 * 
 * width of the container is needed for calculation of the track's position
 */

// These values need to be manually updated if the CSS is changed.
const gap = 16, border = 0, focusedBorder = 0;
const imgWidth = 450, focusedImgWidth = 550; // max widths
const aspectRatio = 16 / 9;
const imgHeight = imgWidth / aspectRatio, focusedImgHeight = focusedImgWidth / aspectRatio; // max heights based on aspect ratio
const focusedImgScale = focusedImgWidth / imgWidth;

export default function Carousel({ images, captions }: { images: string[], captions: string[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // widths & heights of images (unfocused)
  const widthsRef = useRef<number[]>([]);
  const heightsRef = useRef<number[]>([]);

  const [currIndex, setIndex] = useState(0);
  const numImages = images.length;

  // To move the image carousel, we set transform: translateX(offset)
  const updateCarousel = () => {
    const track = trackRef.current;
    const containers = imageContainerRefs.current;
    const images = imageRefs.current;

    const widths = widthsRef.current;
    // console.log(widths);
    const heights = heightsRef.current;

    if (!track || !containers || !images) return;

    for (let i = 0; i < numImages; i++) {
      if (!containers[i]) continue;

      if (i === currIndex) {
        containers[i]!.style.width = `${widths[i] * focusedImgScale}px`;
        containers[i]!.style.height = `${heights[i] * focusedImgScale}px`;
      } else {
        containers[i]!.style.width = `${widths[i]}px`;
        containers[i]!.style.height = `${heights[i]}px`;
      }
    }

    // Offset = track.scrollWidth/2 - (widths of all previous images, including gaps & borders) - (width of focused image)/2
    let offset = 0;

    // Calculate the new track.scrollWidth
    for (let i = 0; i < numImages; i++) {
      offset += i === currIndex ? widths[i] * focusedImgScale : widths[i];
      offset += gap;
      offset += i === currIndex ? focusedBorder : border;
    }
    offset -= gap; // remove extra gap measurement

    offset /= 2;

    for (let i = 0; i < currIndex; i++) {
      offset -= widths[i];
      offset -= (gap + border);
    }

    offset -= widths[currIndex] * focusedImgScale / 2;
    offset -= focusedBorder/2;

    // console.log(offset);
    track.style.transform = `translateX(${offset}px)`;
  }

  useEffect(updateCarousel, [currIndex, numImages]);

  return (
    <div className={styles.carousel}>
      <div className={styles.imageTrack} ref={trackRef}>
        {images.map((src, index) => 
          <div key={index} className={styles.trackItem}>
            <div
              className={`${styles.imgContainer} ${index === currIndex ? styles.focusedImg : ''}`}
              ref={(el) => {imageContainerRefs.current[index] = el}}
              >
              <Image
                className={styles.img}
                ref={(el) => {imageRefs.current[index] = el}}
                src={src}
                alt=""
                fill
                sizes=""
                onLoad={(e) => {
                  const container = imageContainerRefs.current[index];
                  if (!container) return;

                  // Once images have been loaded in, get their size to set the container sizes accordingly
                  const width = e.currentTarget.naturalWidth, height = e.currentTarget.naturalHeight;
                  const goalWidth = currIndex === index ? focusedImgWidth : imgWidth;
                  const goalHeight = currIndex === index ? focusedImgHeight : imgHeight;

                  // image is small enough: fit container around current width & height
                  if (width <= goalWidth && height <= goalHeight) {
                    container.style.width = `${width}px`;
                    container.style.height = `${height}px`;
                  } else {
                    // One of the image's dimensions is too big: scale it down
                    // use aspect ratio to determine whether to shrink to fit width or height
                    if (width/height < aspectRatio) { // width is comparatively small, shrink based on height
                      container.style.width = `${width*goalHeight/height}px`;
                      container.style.height = `${goalHeight}px`
                    } else {
                      container.style.width = `${goalWidth}px`;
                      container.style.height = `${height*goalWidth/width}px`;
                    }
                  }

                  widthsRef.current[index] = currIndex === index ? e.currentTarget.width / focusedImgScale : e.currentTarget.width;
                  heightsRef.current[index] = currIndex === index ? e.currentTarget.height / focusedImgScale : e.currentTarget.height;

                  updateCarousel();
                }}
                />
              </div>
            <div className={styles.caption}>{captions[index]}</div>
          </div>
        )}
      </div>

      <button className={styles.button} style={{ left: 0 }} onClick={ () => setIndex((currIndex - 1 + numImages) % numImages) }>
        <svg viewBox="0 0 24 24">
          <path d="M16 4L8 12L16 20" />
        </svg>
      </button>

      <button className={styles.button} style={{ right: 0 }} onClick={ () => setIndex((currIndex + 1) % numImages) }>
        <svg viewBox="0 0 24 24">
          <path d="M8 4L16 12L8 20" />
        </svg>
      </button>
    </div>
  );
}