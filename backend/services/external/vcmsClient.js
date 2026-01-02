/**
 * VCMS/유로머신 등 외부 기기 플랫폼 연동을 위한 자리표시자.
 * 실제 연동 시 인증/토큰 관리, 엔드포인트 버전, 재시도/백오프 정책을 포함한 HTTP 클라이언트를 구성한다.
 */
class VcmsClient {
  constructor({ baseUrl, apiKey } = {}) {
    this.baseUrl = baseUrl || process.env.VCMS_BASE_URL || "";
    this.apiKey = apiKey || process.env.VCMS_API_KEY || "";
  }

  // 장비에서 발생하는 이벤트를 받아오는 Webhook 시뮬레이터
  async simulateWebhook(payload) {
    console.info("[VCMS webhook simulated]", payload);
    return { status: "simulated", payload };
  }

  // 재고 동기화용 자리표시자
  async syncInventory(items) {
    console.info("[VCMS sync placeholder]", items.length, "items");
    return { status: "queued" };
  }
}

module.exports = VcmsClient;
