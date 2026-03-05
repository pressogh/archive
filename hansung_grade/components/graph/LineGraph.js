import { ResponsiveLine } from '@nivo/line'
import { parseGPA, parseMGPA } from "@/utils/Util";
import { Tooltip } from "@/components/graph/Tooltip";
import { useEffect, useState } from "react";
import { GraphType } from "@/utils/types";

export default function LineGraph({ data, type }) {
    const [parsedData, setParsedData] = useState([]);

    useEffect(() => {
        switch (type) {
            case GraphType.GPA:
                setParsedData(parseGPA(data));
                break;
            case GraphType.MGPA:
                setParsedData(parseMGPA(data));
                break;
            case GraphType.BOTH:
                setParsedData([...parseGPA(data), ...parseMGPA(data)]);
                break;
        }
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
                stacked: type !== GraphType.BOTH,
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
