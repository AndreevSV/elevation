type Status = "available" | "not available";
type AnimalType = "cat" | "dog" | "bird";

// Request
interface IRequest {
  animal: AnimalType;
  breed: string;
  sterilized?: string;
}

const reqst: IRequest = {
  animal: "cat",
  breed: "no",
  sterilized: "yes",
};

// Response #1
interface ResponseYes {
  status: Status;
  data: {
    animal: AnimalType;
    breed: string;
    sterilized?: string;
    location: string;
    age?: number;
  };
}

interface ResponseNo {
  status: Status;
  data: {
    message: "Not available";
    nextUpdateIn: Date;
  };
}

const res1: ResponseYes = {
  status: "available",
  data: {
    animal: "cat",
    breed: "no",
    sterilized: "yes",
    location: "Tel Aviv",
    age: 2,
  },
};

// Response #2
const res2: ResponseNo = {
  status: "not available",
  data: {
    message: "Not available",
    nextUpdateIn: new Date(),
  },
};

function isAvailable(res: ResponseYes | ResponseNo): res is ResponseYes {
	if (res.status === 'available' ) {
		return true;
	} else {
		return false;
	}
}

function checkAnimalData(animal: ResponseYes | ResponseNo) {
  if (isAvailable(animal)) {
    return animal.data;
  } else {
    return `${animal.data}, you can try in ${animal.data.nextUpdateIn}`;
  } 
}

checkAnimalData(res2);
