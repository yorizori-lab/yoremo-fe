"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Recipe, Ingredient, Seasoning, Instruction } from "@/domain/models/recipe"
import { Category } from "@/domain/models/category"
import { CreateRecipeUseCase } from "@/application/use-cases/recipe/create-recipe"
import { RecipeApi } from "@/infrastructure/api/recipe-api"
import { 
  getCategoryTypes, 
  getCategorySituations, 
  getCategoryIngredients, 
  getCategoryMethods,
} from "@/infrastructure/api/repositories/category-repository"

export function useRecipeForm(initialRecipe?: Partial<Recipe>) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 카테고리 데이터 상태
  const [categoryTypes, setCategoryTypes] = useState<Category[]>([])
  const [categorySituations, setCategorySituations] = useState<Category[]>([])
  const [categoryIngredients, setCategoryIngredients] = useState<Category[]>([])
  const [categoryMethods, setCategoryMethods] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  // 기본 정보
  const [title, setTitle] = useState(initialRecipe?.title || "")
  const [description, setDescription] = useState(initialRecipe?.description || "")
  const [categoryType, setCategoryType] = useState<string | null>(initialRecipe?.category_type || null)
  const [categorySituation, setCategorySituation] = useState<string | null>(initialRecipe?.category_situation || null)
  const [categoryIngredient, setCategoryIngredient] = useState<string | null>(
    initialRecipe?.category_ingredient || null,
  )
  const [categoryMethod, setCategoryMethod] = useState<string | null>(initialRecipe?.category_method || null)
  const [prepTime, setPrepTime] = useState<number | null>(initialRecipe?.prep_time || null)
  const [cookTime, setCookTime] = useState<number | null>(initialRecipe?.cook_time || null)
  const [servingSize, setServingSize] = useState<number | null>(initialRecipe?.serving_size || null)
  const [difficulty, setDifficulty] = useState<string | null>(initialRecipe?.difficulty || null)
  const [imageUrl, setImageUrl] = useState(initialRecipe?.image_url || "")
  const [tags, setTags] = useState<string[]>(initialRecipe?.tags || [])
  const [tagInput, setTagInput] = useState("")

  // API에서 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoadingCategories(true)
      try {
        const [types, situations, ingredients, methods] = await Promise.all([
          getCategoryTypes(),
          getCategorySituations(),
          getCategoryIngredients(),
          getCategoryMethods()
        ]);
        
        setCategoryTypes(types)
        setCategorySituations(situations)
        setCategoryIngredients(ingredients)
        setCategoryMethods(methods)
      } catch (error) {
        console.error('카테고리 데이터를 가져오는 중 오류 발생:', error)
        setError('카테고리 데이터를 가져오지 못했습니다.')
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategoryData()
  }, [])

  // JSONB 필드
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialRecipe?.ingredients || [{ name: "", amount: null, unit: "", notes: "" }],
  )

  const [seasonings, setSeasonings] = useState<Seasoning[]>(
    initialRecipe?.seasonings || [{ name: "", amount: null, unit: "" }],
  )

  const [instructions, setInstructions] = useState<Instruction[]>(
    initialRecipe?.instructions || [{ step_number: 1, description: "", image_url: "" }],
  )

  // 재료 관리 함수들
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: null, unit: "", notes: "" }])
  }

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients]
    newIngredients.splice(index, 1)
    setIngredients(newIngredients)
  }

  const handleIngredientChange = (index: number, field: string, value: string | number | null) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = { ...newIngredients[index], [field]: value }
    setIngredients(newIngredients)
  }

  // 양념 관리 함수들
  const handleAddSeasoning = () => {
    setSeasonings([...seasonings, { name: "", amount: null, unit: "" }])
  }

  const handleRemoveSeasoning = (index: number) => {
    const newSeasonings = [...seasonings]
    newSeasonings.splice(index, 1)
    setSeasonings(newSeasonings)
  }

  const handleSeasoningChange = (index: number, field: string, value: string | number | null) => {
    const newSeasonings = [...seasonings]
    newSeasonings[index] = { ...newSeasonings[index], [field]: value }
    setSeasonings(newSeasonings)
  }

  // 조리 단계 관리 함수들
  const handleAddInstruction = () => {
    setInstructions([...instructions, { step_number: instructions.length + 1, description: "", image_url: "" }])
  }

  const handleRemoveInstruction = (index: number) => {
    const newInstructions = [...instructions]
    newInstructions.splice(index, 1)
    // 단계 번호 재정렬
    newInstructions.forEach((instruction, idx) => {
      instruction.step_number = idx + 1
    })
    setInstructions(newInstructions)
  }

  const handleInstructionChange = (index: number, field: string, value: string | number) => {
    const newInstructions = [...instructions]
    newInstructions[index] = { ...newInstructions[index], [field]: value }
    setInstructions(newInstructions)
  }

  // 태그 관리 함수들
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  // 단계 관리 함수들
  const goToNextStep = () => {
    // 현재 단계에 따른 유효성 검사
    if (currentStep === 1) {
      if (!title) {
        setError("레시피 제목을 입력해주세요.")
        return
      }
      setError(null)
    } else if (currentStep === 2) {
      if (ingredients.length === 0 || ingredients.some((ing) => !ing.name)) {
        setError("최소 하나 이상의 재료를 입력해주세요.")
        return
      }
      if (seasonings.length === 0 || seasonings.some((s) => !s.name)) {
        setError("최소 하나 이상의 양념을 입력해주세요.")
        return
      }
      setError(null)
    } else if (currentStep === 3) {
      if (instructions.length === 0 || instructions.some((inst) => !inst.description)) {
        setError("최소 하나 이상의 조리 단계를 입력해주세요.")
        return
      }
      setError(null)
    }

    // 다음 단계로 이동
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0) // 페이지 상단으로 스크롤
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0) // 페이지 상단으로 스크롤
    }
  }

  // 폼 제출 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 마지막 단계 유효성 검사
    if (!title) {
      setError("레시피 제목을 입력해주세요.")
      setCurrentStep(1) // 첫 단계로 이동
      return
    }

    if (ingredients.length === 0 || ingredients.some((ing) => !ing.name)) {
      setError("최소 하나 이상의 재료를 입력해주세요.")
      setCurrentStep(2) // 재료 단계로 이동
      return
    }

    if (instructions.length === 0 || instructions.some((inst) => !inst.description)) {
      setError("최소 하나 이상의 조리 단계를 입력해주세요.")
      setCurrentStep(3) // 조리 방법 단계로 이동
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // 레시피 데이터 준비
      const recipeData: Recipe = {
        title,
        description,
        ingredients,
        seasonings,
        instructions,
        category_type: categoryType,
        category_situation: categorySituation,
        category_ingredient: categoryIngredient,
        category_method: categoryMethod,
        prep_time: prepTime,
        cook_time: cookTime,
        serving_size: servingSize,
        difficulty,
        image_url: imageUrl,
        tags,
      }

      // 유스케이스 실행
      const recipeRepository = new RecipeApi()
      const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository)
      await createRecipeUseCase.execute(recipeData)

      // 성공 시 레시피 목록 페이지로 이동
      router.push("/recipes")
    } catch (err) {
      setError(err instanceof Error ? err.message : "레시피 저장 중 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    // 상태
    currentStep,
    isSubmitting,
    error,
    title,
    description,
    categoryType,
    categorySituation,
    categoryIngredient,
    categoryMethod,
    prepTime,
    cookTime,
    servingSize,
    difficulty,
    imageUrl,
    tags,
    tagInput,
    ingredients,
    seasonings,
    instructions,
    
    // 카테고리 데이터
    categoryTypes,
    categorySituations,
    categoryIngredients,
    categoryMethods,
    isLoadingCategories,

    // 상태 변경 함수
    setTitle,
    setDescription,
    setCategoryType,
    setCategorySituation,
    setCategoryIngredient,
    setCategoryMethod,
    setPrepTime,
    setCookTime,
    setServingSize,
    setDifficulty,
    setImageUrl,
    setTagInput,

    // 재료 관리 함수
    handleAddIngredient,
    handleRemoveIngredient,
    handleIngredientChange,

    // 양념 관리 함수
    handleAddSeasoning,
    handleRemoveSeasoning,
    handleSeasoningChange,

    // 조리 단계 관리 함수
    handleAddInstruction,
    handleRemoveInstruction,
    handleInstructionChange,

    // 태그 관리 함수
    handleAddTag,
    handleRemoveTag,

    // 단계 관리 함수
    goToNextStep,
    goToPrevStep,

    // 폼 제출 함수
    handleSubmit,
  }
}
