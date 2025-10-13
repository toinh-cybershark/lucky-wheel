import type { WheelOfFortunePrize } from "../types/wheel-of-fortune-prize";

export const getFixedPrizeWinner = (prizeWinnerKey: string, prizes: WheelOfFortunePrize[]): [number, WheelOfFortunePrize | null] => {
    const winnerIndex = prizes.findIndex((entry) => entry.key === prizeWinnerKey);
    if (winnerIndex > -1) {
        return [winnerIndex, prizes[winnerIndex]];
    }
    return [-1, null];
}

export const getWeightedPrizeWinner = (prizes: WheelOfFortunePrize[]): [number, WheelOfFortunePrize | null] => {
    const probabilitySum = prizes.reduce((sum, prize) => sum + (prize.probability || 0), 0);
    if (Math.abs(probabilitySum - 1) < 0.0001) {
        const random = Math.random();
        let accumulatedProbability = 0;
        for (let i = 0; i < prizes.length; i++) {
            accumulatedProbability += prizes[i].probability || 0;
            if (random <= accumulatedProbability) {
                return [i, prizes[i]];
            }
        }
    }
    return [-1, null];
}

export const getRandomPrizeWinner = (prizes: WheelOfFortunePrize[]): [number, WheelOfFortunePrize | null] => {
    const winnerIndex = Math.floor(Math.random() * prizes.length);
    const winner = prizes[winnerIndex];
    return [winnerIndex, winner];
}

export const getFixedPrizeWinnerApi = (
  prizeWinnerKey: string, 
  prizes: WheelOfFortunePrize[]
): [number, WheelOfFortunePrize | null] => {
  const winnerIndex = prizes.findIndex((entry) => entry.key === prizeWinnerKey);
  if (winnerIndex > -1) {
    return [winnerIndex, prizes[winnerIndex]];
  }
  // Nếu không tìm thấy key, có thể trả về một giải thưởng mặc định, ví dụ "Chúc may mắn lần sau"
  const tryAgainIndex = prizes.findIndex((entry) => entry.key === 'try_again');
  if (tryAgainIndex > -1) {
    return [tryAgainIndex, prizes[tryAgainIndex]];
  }
  return [-1, null]; // Trường hợp tệ nhất
};

// ... hàm getWeightedPrizeWinner của bạn có thể ở đây

// Hàm chính để quyết định người thắng cuộc
export const getPrizeWinner = async (prizes: WheelOfFortunePrize[]): Promise<[number, WheelOfFortunePrize | null]> => {
  try {
    // ---- GIẢ LẬP GỌI API ----
    // Trong thực tế, bạn sẽ dùng fetch, axios, etc.
    // Dòng new Promise này chỉ để giả lập độ trễ của mạng.
    console.log("Đang gọi API để lấy kết quả...");
    const prizeKeyFromApi = await new Promise<string>(resolve => {
        setTimeout(() => {
            // Random một kết quả để test
            const randomIndex = Math.floor(Math.random() * prizes.length);
            const randomKey = prizes[randomIndex].key;
            console.log(`API trả về kết quả: ${randomKey}`);
            resolve(randomKey);
        }, 1500); // Giả lập API trả về sau 1.5 giây
    });
    // ---- KẾT THÚC GIẢ LẬP ----

    // const response = await fetch('YOUR_API_ENDPOINT');
    // const data = await response.json();
    // const prizeKeyFromApi = data.prizeKey;

    return getFixedPrizeWinner(prizeKeyFromApi, prizes);

  } catch (error) {
    console.error("Lỗi khi gọi API, trả về giải an ủi:", error);
    // Nếu API lỗi, luôn trả về "Chúc may mắn lần sau"
    return getFixedPrizeWinner('try_again', prizes);
  }
}