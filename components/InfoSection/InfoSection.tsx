import styles from "./InfoSection.module.css";

export function InfoSection({title, info, picture}: {title: string, info: string[], picture?: string}) {
  return (
    <div className={`${styles.section} float`}>
      <div className={picture ? styles.left : ""}>
        <h3>{title}</h3>

        <ul>
          {info.map((text, index) => 
            <li key={index}>{text}</li>
          )}
        </ul>
      </div>

      {picture && 
        <div className={styles.right}>
          <img className={styles.image} src={`/info_images/${picture}`} alt={picture} />
        </div>
      }
    </div>
  )
}