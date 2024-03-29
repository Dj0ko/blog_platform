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
}

const realWorldDbService = new RealWorldDbService();

export default realWorldDbService;
