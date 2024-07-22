export interface PetResponse {
  id: string;
  age: number;
  name: string;
  PetId: string;
  Pet?: Pet;
}

export interface Pet {
  id: string;
  name: string;
  age: number;
  PetId: string;
}

export interface CreatePetInput {
  name: string;
  age: number;
  userId: string;
}

// export interface UpdatePetInput {
//   id: string;
//   name?: string;
//   age?: number;
// }

// export interface ListPetsData {
//   listPet: Pet[];
// }

export interface CreatePetData {
  createPet: Pet;
}

// export interface UpdatePetData {
//   updatePet: Pet;
// }

// export interface DeletePetData {
//   deletePet: Pet;
// }

// export interface DestroyPetData {
//   destroyPet: Pet;
// }

export interface CreatePetVars {
  input: CreatePetInput;
}

// export interface UpdatePetVars {
//   input: UpdatePetInput;
// }

// export interface DeletePetVars {
//   PetId: string;
// }

// export interface DestroyPetVars {
//   PetId: string;
// }
