interface UserProfile {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

export { UserProfile };
