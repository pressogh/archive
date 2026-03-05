import {Card, Text} from "@nextui-org/react";
import {gradeWeight} from "@/utils/Util";

export const Tooltip = ({ data }) => {
    let lst = data.point.data.subject.slice();
    lst.sort((a, b) => {
        if (gradeWeight[a.grade] < gradeWeight[b.grade]) return 1;
        else return -1;
    })

    return (
        <Card css={{ pl: "10px", pr: "10px" }}>
            <Card.Body>
                <div className='tooltip-item title'>
                    <Text weight={"bold"}>{ data.point.serieId }</Text>
                    <Text>{data.point.data.y}</Text>
                </div>
                {
                    lst.map((item) => {
                        return (
                            <div key={item?.name} className="tooltip-item">
                                <div className='tooltip-name'>
                                    { item?.name }
                                </div>
                                <div className='tooltip-grade'>
                                    { item?.grade }
                                </div>
                            </div>
                        );
                    })
                }

                <style jsx>{`
                    .title {
                        display: flex;
                        padding-bottom: 1vh;
                        margin-bottom: 1vh;
                        border-bottom: 1px solid rgba(219, 219, 219, 1);
                    }
    
                    .tooltip-item {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        min-width: 10vw;
                    }
    
                    .tooltip-name {
                        margin-right: 2vw;
                    }
                    
                    .tooltip-grade {
                        margin-left: 2vw;
                    }
                `}</style>
            </Card.Body>
        </Card>
    )
}
