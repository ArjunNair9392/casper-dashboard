import React from "react";
import styles from './Mtcontent.module.scss';

function MTcontent(props) {
    return (
        <div
            key={props.index}
            className={styles.sectionJobsStyledContent}
            style={
                props.activeTabId === props.index
                    ? { display: "block" }
                    : { display: "none" }
            }
        >
            Hello
        </div>
    );
}

export default MTcontent;
