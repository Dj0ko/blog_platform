class RealWorldDbService {
  async getArticlesList(offSet) {
    const res = await fetch(
      `https://conduit.productionready.io/api/articles?offset=${offSet === 1 ? 0 : (offSet - 1) * 5 - 1}&limit=5`
    );

    if (!res.ok) {
      throw new Error();
    }

    const body = await res.json();
    return body;
  }

  async registrationNewUser(data) {
    const res = await fetch(`https://conduit.productionready.io/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();
    console.log(body);

    return body;
  }

  async loginUser(data) {
    const res = await fetch(`https://conduit.productionready.io/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();
    console.log(body);

    return body;
  }
}

const realWorldDbService = new RealWorldDbService();

export default realWorldDbService;
