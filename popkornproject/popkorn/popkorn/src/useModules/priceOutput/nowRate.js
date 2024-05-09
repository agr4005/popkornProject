export default async function nowRate() {
    try {
        const response = await fetch("https://api.manana.kr/exchange/rate.json");
        
        if (!response.ok) {
            throw new Error("환율을 가져오는 중 오류 발생: " + response.status);
        }

        const data = await response.json();
        const rate = data[1].rate; // 응답 데이터에 따라 조절 필요

        return rate;
    } catch (error) {
        console.error(error);
        return 1378.80; // 에러가 발생할 경우 기본값 반환
    }
}

