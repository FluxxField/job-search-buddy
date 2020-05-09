export const emailValidator = (email) => {
  const regEx = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty";
  if (!regEx.test(email)) return "Email is not valid";

  return "";
};

export const passwordValidator = (passwordOne, passwordTwo) => {
  const regEx = /\S{6,}/;

  if (
    !passwordOne ||
    !passwordTwo ||
    passwordOne.length <= 0 ||
    passwordTwo.length <= 0
  ) {
    return "The passwords cannot be empty";
  }

  if (passwordOne !== passwordTwo) return "The passwords must be the same";

  if (!regEx.test(passwordOne) || !regEx.test(passwordTwo)) {
    return "The password cannot be less than 6 characters long";
  }

  return "";
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return "Name cannot be empty";

  return "";
};

export const titleValidator = (title) => {
  if (!title || title.length <= 0) return "Title cannot be empty";

  return "";
};

export const descValidator = (desc) => {
  if (!desc || desc.length <= 0) return "Description cannot be empty";

  return "";
};

export const toFirestore = (jobsMap) => {
  return [...jobsMap].reduce((acc, [key, job]) => {
    let newJob = {
      ...job,
      tabs: {},
    };

    if (job.tabs) {
      job.tabs.map((tab, i) => {
        newJob.tabs[i] = tab;
      });
    }

    return [...acc, newJob];
  }, []);
};

export const fromFirestore = (jobsArray) => {
  return new Map(
    jobsArray.reduce((acc, cur) => {
      let tabsArray = [];

      Object.keys(cur.tabs).map((tabIndex) => {
        tabsArray[tabIndex] = cur.tabs[tabIndex];
      });

      return [...acc, [cur.id, { ...cur, tabs: tabsArray }]];
    }, [])
  );
};
