import { parseGPA, parseMGPA } from "@/utils/Util";
import {useEffect, useState} from "react";

export default function Progress({ data, type }) {
	const [parsedData, setParsedData] = useState([]);

	useEffect(() => {
		if (type === "GPA") setParsedData(parseGPA(data));
		else if (type === "MGPA") setParsedData(parseMGPA(data));
		else if (type === "BothGPA") setParsedData([...parseGPA(data), ...parseMGPA(data)]);
	}, [data, type])

	return (
		<>
		</>
	)
}
