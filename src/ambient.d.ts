type Address = {
  id: string;
  name: string;
  gasPrice: number;
  waterPrice: number;
  electricityPrice: number;
  heating: number;
  internet: number;
  intercom: number;
  gasRaspred: number;
  abonplata: number;
  garbage: number;
  kvartplata: number;
  userID: string;
};

type Tarif = {
  id: string;
  userID: string;
  createdAt?: any;
  addressID: string;
  prevGas: number;
  currGas: number;
  distinctionGas: number;
  totalGas: number;
  prevWater: number;
  currWater: number;
  distinctionWater: number;
  totalWater: number;
  prevElec: number;
  currElec: number;
  distinctionElec: number;
  totalElec: number;
  total: number;
};
