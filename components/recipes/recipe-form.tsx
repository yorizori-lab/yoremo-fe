"use client"

import { PlusCircle, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRecipeForm } from "@/presentation/hooks/use-recipe-form"
import { Skeleton } from "@/components/ui/skeleton"

// 카테고리 데이터는 API에서 가져옵니다 (useRecipeForm 내부에서 처리)

const difficultyOptions = ["쉬움", "보통", "어려움"]

export default function RecipeForm() {
  const {
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
  } = useRecipeForm()

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* 단계 표시 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            1
          </div>
          <div className={`h-1 w-12 ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            2
          </div>
          <div className={`h-1 w-12 ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            3
          </div>
          <div className={`h-1 w-12 ${currentStep >= 4 ? "bg-primary" : "bg-muted"}`}></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            4
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {currentStep === 1 && "기본 정보"}
          {currentStep === 2 && "재료 및 양념"}
          {currentStep === 3 && "조리 방법"}
          {currentStep === 4 && "추가 정보"}
        </div>
      </div>

      {/* 오류 메시지 */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 기본 정보 (단계 1) */}
      {currentStep === 1 && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            <h2 className="text-xl font-bold">기본 정보</h2>
            <div className="space-y-2">
              <Label htmlFor="title">레시피 제목 *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="레시피 제목을 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">레시피 설명</Label>
              <Textarea
                id="description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="레시피에 대한 간략한 설명을 입력하세요"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category-type">종류별 카테고리</Label>
                {isLoadingCategories ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={categoryType?.toString() || ""}
                    onValueChange={(value) => setCategoryType(Number.parseInt(value))}
                  >
                    <SelectTrigger id="category-type">
                      <SelectValue placeholder="종류 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {(categoryTypes || []).map((category) => (
                        <SelectItem 
                          key={category?.category_id} 
                          value={category?.category_id.toString()}
                        >
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-situation">상황별 카테고리</Label>
                {isLoadingCategories ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={categorySituation?.toString() || ""}
                    onValueChange={(value) => setCategorySituation(Number.parseInt(value))}
                  >
                    <SelectTrigger id="category-situation">
                      <SelectValue placeholder="상황 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {(categorySituations || []).map((category) => (
                        <SelectItem 
                          key={category?.category_id} 
                          value={category?.category_id.toString()}
                        >
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-ingredient">재료별 카테고리</Label>
                {isLoadingCategories ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={categoryIngredient?.toString() || ""}
                    onValueChange={(value) => setCategoryIngredient(Number.parseInt(value))}
                  >
                    <SelectTrigger id="category-ingredient">
                      <SelectValue placeholder="주 재료 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {(categoryIngredients || []).map((category) => (
                        <SelectItem 
                          key={category?.category_id} 
                          value={category?.category_id.toString()}
                        >
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-method">방법별 카테고리</Label>
                {isLoadingCategories ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={categoryMethod?.toString() || ""}
                    onValueChange={(value) => setCategoryMethod(Number.parseInt(value))}
                  >
                    <SelectTrigger id="category-method">
                      <SelectValue placeholder="조리 방법 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {(categoryMethods || []).map((category) => (
                        <SelectItem 
                          key={category?.category_id} 
                          value={category?.category_id.toString()}
                        >
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-url">대표 이미지 URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image-url"
                  value={imageUrl || ""}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="이미지 URL을 입력하세요"
                />
                <Button type="button" variant="outline" className="flex-shrink-0">
                  <Upload className="h-4 w-4 mr-2" />
                  업로드
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 재료 및 양념 (단계 2) */}
      {currentStep === 2 && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            <h2 className="text-xl font-bold">재료 및 양념</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">재료 목록 *</h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddIngredient}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  재료 추가
                </Button>
              </div>

              {ingredients.map((ingredient, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-4">
                    <Label htmlFor={`ingredient-name-${index}`} className="sr-only">
                      재료명
                    </Label>
                    <Input
                      id={`ingredient-name-${index}`}
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                      placeholder="재료명"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`ingredient-amount-${index}`} className="sr-only">
                      양
                    </Label>
                    <Input
                      id={`ingredient-amount-${index}`}
                      type="number"
                      value={ingredient.amount || ""}
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "amount",
                          e.target.value ? Number.parseFloat(e.target.value) : null,
                        )
                      }
                      placeholder="양"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`ingredient-unit-${index}`} className="sr-only">
                      단위
                    </Label>
                    <Input
                      id={`ingredient-unit-${index}`}
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                      placeholder="단위 (g, 개 등)"
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor={`ingredient-notes-${index}`} className="sr-only">
                      비고
                    </Label>
                    <Input
                      id={`ingredient-notes-${index}`}
                      value={ingredient.notes}
                      onChange={(e) => handleIngredientChange(index, "notes", e.target.value)}
                      placeholder="비고 (예: 삼겹살)"
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {ingredients.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveIngredient(index)}
                        className="h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">삭제</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">양념 목록 *</h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddSeasoning}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  양념 추가
                </Button>
              </div>

              {seasonings.map((seasoning, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-6">
                    <Label htmlFor={`seasoning-name-${index}`} className="sr-only">
                      양념명
                    </Label>
                    <Input
                      id={`seasoning-name-${index}`}
                      value={seasoning.name}
                      onChange={(e) => handleSeasoningChange(index, "name", e.target.value)}
                      placeholder="양념명"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`seasoning-amount-${index}`} className="sr-only">
                      양
                    </Label>
                    <Input
                      id={`seasoning-amount-${index}`}
                      type="number"
                      value={seasoning.amount || ""}
                      onChange={(e) =>
                        handleSeasoningChange(
                          index,
                          "amount",
                          e.target.value ? Number.parseFloat(e.target.value) : null,
                        )
                      }
                      placeholder="양"
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor={`seasoning-unit-${index}`} className="sr-only">
                      단위
                    </Label>
                    <Input
                      id={`seasoning-unit-${index}`}
                      value={seasoning.unit}
                      onChange={(e) => handleSeasoningChange(index, "unit", e.target.value)}
                      placeholder="단위 (큰술, 작은술 등)"
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {seasonings.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSeasoning(index)}
                        className="h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">삭제</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 조리 방법 (단계 3) */}
      {currentStep === 3 && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            <h2 className="text-xl font-bold">조리 방법</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">조리 단계 *</h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddInstruction}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  단계 추가
                </Button>
              </div>

              {instructions.map((instruction, index) => (
                <div key={index} className="space-y-2 border p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">단계 {instruction.step_number}</h4>
                    {instructions.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveInstruction(index)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">삭제</span>
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`instruction-description-${index}`}>설명</Label>
                    <Textarea
                      id={`instruction-description-${index}`}
                      value={instruction.description}
                      onChange={(e) => handleInstructionChange(index, "description", e.target.value)}
                      placeholder="조리 단계에 대한 설명을 입력하세요"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`instruction-image-${index}`}>단계 이미지 URL (선택사항)</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`instruction-image-${index}`}
                        value={instruction.image_url}
                        onChange={(e) => handleInstructionChange(index, "image_url", e.target.value)}
                        placeholder="이미지 URL을 입력하세요"
                      />
                      <Button type="button" variant="outline" className="flex-shrink-0">
                        <Upload className="h-4 w-4 mr-2" />
                        업로드
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 추가 정보 (단계 4) */}
      {currentStep === 4 && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            <h2 className="text-xl font-bold">추가 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="prep-time">준비 시간 (분)</Label>
                <Input
                  id="prep-time"
                  type="number"
                  value={prepTime || ""}
                  onChange={(e) => setPrepTime(e.target.value ? Number.parseInt(e.target.value) : null)}
                  placeholder="준비 시간"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cook-time">조리 시간 (분)</Label>
                <Input
                  id="cook-time"
                  type="number"
                  value={cookTime || ""}
                  onChange={(e) => setCookTime(e.target.value ? Number.parseInt(e.target.value) : null)}
                  placeholder="조리 시간"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serving-size">몇 인분</Label>
                <Input
                  id="serving-size"
                  type="number"
                  value={servingSize || ""}
                  onChange={(e) => setServingSize(e.target.value ? Number.parseInt(e.target.value) : null)}
                  placeholder="몇 인분"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">난이도</Label>
              <Select value={difficulty || ""} onValueChange={(value) => setDifficulty(value)}>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="난이도 선택" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">태그</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="태그 입력 후 추가 버튼 클릭"
                />
                <Button type="button" variant="outline" onClick={handleAddTag} className="flex-shrink-0">
                  추가
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div key={tag} className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">태그 삭제</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 단계 이동 버튼 */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={goToPrevStep} disabled={currentStep === 1}>
          이전
        </Button>

        {currentStep < 4 ? (
          <Button type="button" onClick={goToNextStep}>
            다음
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : "레시피 저장"}
          </Button>
        )}
      </div>
    </form>
  )
}
