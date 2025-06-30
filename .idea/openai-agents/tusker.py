import os
from agents import Agent, Runner, set_tracing_disabled
from agents.extensions.models.litellm_model import LitellmModel
from dotenv import load_dotenv

load_dotenv(override=True)
set_tracing_disabled(True)

def main(model: str, api_key: str):
    agent = Agent(
        name="Assistant",
        instructions="You only respond in haikus.",
        model=LitellmModel(
            model=model,
            base_url="http://localhost:4000",
            api_key=api_key,
        ),
    )
    result = Runner.run_sync(agent, "What's the weather in 98026?")
    print(result.final_output)

if __name__ == "__main__":
    model = "openrouter/mistralai/mistral-small"
    api_key = os.environ["LITELLM_MASTER_KEY"]
    main(model, api_key)
