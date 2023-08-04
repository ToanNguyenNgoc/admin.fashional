export interface ResponseDetail<T> {
    context: T,
    statusCode: number
}
export interface ResponseList<T> {
    statusCode: number;
    context: {
        data: T;
        total: number;
        total_page: number;
        prev_page: number;
        current_page: number;
        next_page: number;
    }
}