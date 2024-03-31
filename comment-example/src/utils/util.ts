export type Comment = {
  content: string;
  children: Comment[];
};

export const dummyComments: Comment[] = [
  {
    content: "Comment 1",
    children: [
      {
        content: "Comment 1.1",
        children: [
          {
            content: "Comment 1.1.1",
            children: [],
          },
        ],
      },
      {
        content: "Comment 1.2",
        children: [],
      },
    ],
  },
  {
    content: "Comment 2",
    children: [
      {
        content: "Comment 2.1",
        children: [
          {
            content: "Comment 2.1.1",
            children: [
              {
                content: "Comment 2.2.1",
                children: [
                  {
                    content: "Comment 2.3.1",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
