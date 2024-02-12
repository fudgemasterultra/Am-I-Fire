export namespace Types {
  export type ImageDoc = {
    url: string;
    owner: string;
    likes: string[];
    dislikes: string[];
  };
  export type DocedImageDoc = {
    id: string;
    image: ImageDoc;
  };
}
