export interface ArticleContent {
    _id?: string;
    postID: number;
    content: string;
    createdAt?: Date;
    updatedAt: Date;
}