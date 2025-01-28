import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type DetailProps = {
    path: string;
    method: string;
}
export const ApiDetail = (props: DetailProps) => {

    const fetchDetails = async (path: string, method: string) => axios.get(`/api/mock-detail?path=${path}&method=${method}`);

    const { data, error, isLoading } = useQuery({
        queryKey: ['details', props.path, props.method],
        queryFn: () => fetchDetails(props.path, props.method),
        enabled: true
    });
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div className="text-red-500">Error: {error.message}</div>}
            {data && <div>{JSON.stringify(data.data)}</div>}
        </div>
    );
};