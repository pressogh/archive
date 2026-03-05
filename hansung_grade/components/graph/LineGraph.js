import { ResponsiveLine } from '@nivo/line'
import { parseGPA, parseMGPA } from "@/utils/Util";
import { Tooltip } from "@/components/graph/Tooltip";
import { useEffect, useState } from "react";

export default function LineGraph({ data, type }) {
    const [parsedData, setParsedData] = useState([]);

    useEffect(() => {
        if (type === "GPA") setParsedData(parseGPA(data));
        else if (type === "MGPA") setParsedData(parseMGPA(data));
        else if (type === "BothGPA") setParsedData([...parseGPA(data), ...parseMGPA(data)]);
    }, [data, type])

    return (
        <ResponsiveLine
            data={parsedData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: type !== "BothGPA",
                reverse: false
            }}
            yFormat=" >-.1f"
            colors={{ scheme: 'pastel1' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
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
            tooltip={(input) => {
                return (
                    <Tooltip data={input} name={"평균평점"} />
                )}
            }
        />
    )
}
