import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import MTlist from "./helpers/MTlist";
import MTcontent from "./helpers/MTcontent";

import styles from './MultiTabs.module.scss';

function MultiTabs(props: { data: any[]; }) {
    const [activeTabId, setActiveTabId] = useState(0);

    function btnClick(id: React.SetStateAction<number>) {
        setActiveTabId(id);
    }

    return (
        <div className={styles.sectionJobsContainer}>
            <div className={styles.sectionJobsStyledTab}>
                <ul className={styles.sectionJobsStyledTabList}>
                    {props.data.map((job: any, index: any) => (
                        <MTlist
                            key={index}
                            onClick={btnClick}
                            index={index}
                            activeTabId={activeTabId}
                        />
                    ))}
                </ul>
            </div>
            {props.data.map((job: any, index: any) => (
                <MTcontent
                    key={index}
                    index={index}
                    activeTabId={activeTabId}
                />
            ))}

            <span
                className={
                    activeTabId === 0
                        ? "index1-chosen"
                        : activeTabId === 1
                            ? "index2-chosen"
                            : "index3-chosen"
                }
            >
                &nbsp;
            </span>
        </div>
    );
}

export default MultiTabs;
