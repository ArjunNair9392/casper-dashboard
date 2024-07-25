import React from "react";

import styles from './Mtlist.module.scss';

function MTlist(props) {
    const Clicked = () => {
        props.onClick(props.index);
    };

    return (
        <li key={props.index} style={{ listStyle: "none", textAlign: "left" }}>
            <button
                className={styles.sectionJobsButtonCompany}
                onClick={Clicked}
                style={
                    props.activeTabId === props.index
                        ? { color: "#64ffda" }
                        : { color: "#8892b0" }
                }
            >
                Folder name
            </button>
        </li>
    );
}

export default MTlist;
