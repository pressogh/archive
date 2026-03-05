import { ResponsiveLine } from '@nivo/line'
import { randomData } from "@/utils/Util";
import { useInterval } from "@/hooks/Hooks";
import { useEffect, useState } from "react";
import { Loading } from "@nextui-org/react";

export default function RandomGraph() {
    const [randomGrade, setRandomGrade] = useState(0);

    useInterval(() => {
        setRandomGrade(randomGrade + 1);
    }, [1500]);

    useEffect(() => {
        setRandomGrade(randomGrade + 1);
    }, [])

    useEffect(()=>{},[randomGrade]);

    if (!randomGrade) return <Loading size="xl" />
    return (
        <>
            <ResponsiveLine
                data={randomData()}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: '3.5',
                    max: '4.5',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                colors={{ scheme: 'pastel1' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                tooltip={()=>{}}
            />
        </>
    )
}
