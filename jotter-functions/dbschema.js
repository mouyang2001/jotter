let db = {
  users: [
    {
      userId: 'asdf;askdf',
      email: 'user@gmail.com',
      handle: 'user'
    }
  ],
  notes: [
    {
      userHandle: "user",
      body: "this is the body",
      createdAt: "2020-11-24T09:02:18.128Z",
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: "user",
      noteId: "asd;fklasdf",
      body: "Nice I didn't think of that",
      createdAt: "2020-12-10",
    }
  ]
};

const userDetails = {
  // redux data
  credentials: {
    userId: 'N43KJ5HILSI5IDJF5',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2020-03-15T10:59:52.798Z',
    imageUrl: 'image/asdfaklsdfaskdfj/asdfasdf',
    bio: 'Hello nice to meet you',
    website: 'https://user.com',
    location: 'new zealand'
  },
  likes: [
    {
      userHandle: 'user',
      noteId: 'asdfasdklf',
    },
    {
      userhandle: 'user',
      noteId: 'asdfasdfasdf',
    }
  ]
}