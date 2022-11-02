import axios from "axios";

export default async function ping() {
  let { data } = await axios.get("http://localhost:3001/api/ping");
  console.log(data);
}
